<script lang="ts" setup>
import type { CalendarData, RawCalendar, CalendarGroupBySession } from '@/utils/calendar'
import { processCalendar } from '@/utils/calendar'
import SessionBar from '@/components/SessionBar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import get from 'axios'
import { ref, toRaw, reactive, computed, triggerRef } from 'vue'

type SelectedCalendar = {
  [subjectName: string]: {
    isChecked: boolean
    class: {
      subjectName: string,
      code: string
      details: CalendarGroupBySession
      subjectId: string | number
    } | null
  }
}

// state
const loading = ref(true)
const loadingOnSelectSubject = ref(false)
const sessions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
const dayOfWeekMap = ['Chủ Nhật', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy']
const download_path = `https://kit-api.ngosangns.com/storage/tinchi.xlsx?timestamp=${new Date().getTime()}`
const defaultClassLabel = 'Chọn lớp'
const triggerRerenderClass = ref()
const triggerRerenderTable = ref()
const isOpenModel = ref(false)
const modalMessage = ref('')
const modalBtn: any = ref()
const modalEl = ref()
const triggerRerenderSelectedCalendarComputedTable = ref()

// data
const data: any = reactive({})
const calendar: CalendarData = reactive(<CalendarData>{})
const selectedCalendar: SelectedCalendar = reactive(<SelectedCalendar>{})
const calendarTableContent: any = reactive({})

const fetchData = async function () {
  try {
    // fetch calendar
    const response: any = await get(`https://kit-api.ngosangns.com/storage/tinchi.json?timestamp=${new Date().getTime()}`, {
      responseType: 'json',
    })

    // process calendar
    Object.assign(data, response.data)
    Object.assign(calendar, processCalendar(data?.data as Array<RawCalendar> || []))

    { // init calendar table contents
      const result: any = {}
      for (const date of calendar.dateList) {
        result[date] = {}
        const resultDate = result[date]
        for (const session of sessions) resultDate[session] = []
      }
      Object.assign(calendarTableContent, result)
    }
  } catch (e: any) {
    modalMessage.value = e.message
  } finally {
    loading.value = false
  }
}

fetchData()

const openModel = function (message: string) {
  isOpenModel.value = true
  modalMessage.value = message
  modalBtn.value.click()
}

const closeModel = () => isOpenModel.value = false

const checkSession = (shift: number) => {
  if (shift >= 1 && shift <= 6) return 'morning'
  if (shift >= 7 && shift <= 12) return 'afternoon'
  return 'evening'
}

const onChangeSelectSubjectClass = async (
  majorName: string,
  subjectName: string,
  selectClassEvent: EventTarget | any = null
) => {
  (async () => {
    const _subjectName = majorName + '---' + subjectName
    const classCode: string = '' + selectClassEvent?.value

    // init values
    if (!selectedCalendar[_subjectName])
      selectedCalendar[_subjectName] = { isChecked: false, class: null }

    const isOldShow = selectedCalendar[_subjectName].isChecked && selectedCalendar[_subjectName].class != null
    const oldClass = selectedCalendar[_subjectName].class = selectedCalendar[_subjectName].class

    if (!selectClassEvent) // check select subject
      selectedCalendar[_subjectName].isChecked = !selectedCalendar[_subjectName].isChecked
    else { // check select class
      if (classCode == defaultClassLabel) selectedCalendar[_subjectName].class = null
      else selectedCalendar[_subjectName].class = {
        subjectId: calendar.calendarGroupBySubjectName[subjectName].id,
        subjectName: subjectName,
        code: classCode,
        details: toRaw(calendar.calendarGroupBySubjectName[subjectName].classes[classCode].details),
      }
    }

    const isNewShow = selectedCalendar[_subjectName].isChecked && selectedCalendar[_subjectName].class != null
    const newClass = selectedCalendar[_subjectName].class = selectedCalendar[_subjectName].class

    if (isOldShow != isNewShow || (isOldShow && isNewShow && oldClass != newClass)) // conditions to skip rerender
      await calculateCalendarTableContent()
  })()
}

const selectedCalendarComputedTable = computed(() => {
  triggerRerenderSelectedCalendarComputedTable.value
  return Object.values((toRaw(selectedCalendar))).filter((item: any) => item.isChecked && item.class != null)
})

const calculateCalendarTableContent = async () => {
  return new Promise((resolve, reject) => {
    loadingOnSelectSubject.value = true

    const worker = new Worker('/tinchi/calendar.js')
    worker.onmessage = (res: { data: any }) => resolve(res.data)
    worker.onerror = (err: any) => reject(err)
    worker.postMessage({
      type: 'calculateCalendarTableContent',
      data: JSON.parse(JSON.stringify({
        calendarTableContent: toRaw(calendarTableContent),
        dateList: toRaw(calendar.dateList),
        sessions,
        selectedCalendar: toRaw(selectedCalendar)
      }))
    })
  })
    .then((result: any) => {
      if (result) {
        Object.keys(calendarTableContent).forEach(key => delete calendarTableContent[key])
        Object.assign(calendarTableContent, result.calendarTableContent)
        if (result.isConflict && !isOpenModel.value) openModel('Cảnh báo trùng lịch!')
      }

      if (isOpenModel.value) setTimeout(() => (triggerRef(triggerRerenderTable)), 150)
    })
    .catch((e) => openModel('Có lỗi xảy ra, không thể cập nhật dữ liệu!'))
    .finally(() => {
      triggerRef(triggerRerenderSelectedCalendarComputedTable)
      loadingOnSelectSubject.value = false
    })
}

const resetClass = async () => {
  for (const key in selectedCalendar) delete selectedCalendar[key]
  triggerRef(triggerRerenderClass)
  await calculateCalendarTableContent()
}

const exportCalendar = () => {
  window.print()
}
</script>

<template>
  <Header />

  <main class="app">
    <div v-if="loading" class="text-center">
      <span class="loading loading-dots loading-lg"></span>
    </div>
    <div v-else>
      <div class="toolbar flex gap-2 mb-2 fixed bottom-0 z-10">
        <label class="btn bg-gray-700 text-gray-100 hover:bg-gray-900" for="my-modal-4">Chọn lớp</label>
        <button class="btn bg-gray-700 text-gray-100 hover:bg-gray-900" @click="exportCalendar">Xuất</button>
      </div>

      <input type="checkbox" id="my-modal-4" class="modal-toggle" />

      <!-- select class modal -->
      <label id="my-modal-4-content" for="my-modal-4" class="modal cursor-pointer">
        <label ref="modalEl"
          :class='{ "modal-box w-9/12 max-w-3xl relative rounded-lg": true, "overflow-hidden": loadingOnSelectSubject }'
          for="">
          <div v-if="loadingOnSelectSubject" class="text-center loading-box"
            :style="`top: calc(${modalEl.scrollTop}px + 1px)`">
            <span class="loading loading-dots loading-lg"></span>
          </div>
          <label for="my-modal-4" class="btn btn-sm btn-circle sticky top-2 left-[95%] z-10">✕</label>
          <div class="w-full">
            <div class="mb-8 w-full mx-auto">
              <p class="mb-2">Học kỳ: <b>
                  <h3 class="inline">{{ data?.title }}</h3>
                </b></p>
              <p>Lưu ý: Các môn có tiết thực hành (có đuôi chấm theo sau) đã được thêm tiết lý thuyết vào.</p>
              <p>Hướng dẫn:</p>
              <ul class="list-disc ml-4 mb-2" style="padding-left: .125rem">
                <li>
                  Check vào nút đăng ký các môn muốn học, sau đó chọn lớp cho từng môn, tiết nào bị trùng
                  thì sẽ chuyển sang màu đỏ, bấm vào ô trong lịch để xem những môn của tiết đấy.
                </li>
                <li>
                  Xem chi tiết thông tin của từng lớp trong file excel của trường, tải ở
                  <b><a :href="download_path" target="_blank">đây</a></b>.
                </li>
              </ul>
              <p><b>Chúc các bạn đăng ký đúng lớp đã chọn ❤</b></p>
            </div>
            <button class="btn my-4" @click="resetClass">Reset</button>
            <template :key="triggerRerenderClass"
              v-for="[majorName, major] in Object.entries(calendar?.calendarGroupByMajor).sort((a, b) => a[0].localeCompare(b[0]))">
              <div class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box w-full mx-auto mb-4">
                <input type="checkbox" />
                <div class="collapse-title text-xl font-medium">
                  <b><span>{{ majorName }}</span></b>
                </div>
                <div class="collapse-content">
                  <table class="table table-compact w-full">
                    <thead>
                      <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center w-24">Đăng ký</th>
                        <th>Tên môn</th>
                        <th class="pl-5 w-40">Lớp</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="[subject, subjectValue] in Object.entries((major as any).subjects)">
                        <tr>
                          <td>
                            <div class="flex items-center justify-center space-x-3">
                              <span class="font-bold">{{ (subjectValue as any).id }}</span>
                            </div>
                          </td>
                          <td class="text-center w-24">
                            <label>
                              <input type="checkbox" class="checkbox"
                                @change="() => onChangeSelectSubjectClass(majorName, subject)" />
                            </label>
                          </td>

                          <td>
                            <div class="flex items-center space-x-3">
                              <span class="font-bold">{{ subject }}</span>
                            </div>
                          </td>
                          <td class="w-40">
                            <select class="select select-bordered select-sm w-full max-w-xs"
                              @change="(e) => onChangeSelectSubjectClass(majorName, subject, e.target)">
                              <option selected>{{ defaultClassLabel }}</option>
                              <template v-for="[code, codeValue] in Object.entries((subjectValue as any).classes)">
                                <option>{{ code }}</option>
                              </template>
                            </select>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
          </div>
        </label>
      </label>

      <!-- selected classes -->
      <div class="calendar-table" :key="triggerRerenderTable">
        <div class="text-xl font-medium mb-2 uppercase">
          <b>
            <span>Lớp đã chọn</span>
          </b>
        </div>
        <table class="table table-compact w-full mb-4 bg-base-200 rounded-lg">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên môn</th>
              <th class="pl-5 w-40">Lớp</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="selectedCalendarComputedTable.length" v-for="subject in selectedCalendarComputedTable">
              <tr>
                <td>
                  <div class="flex items-center space-x-3">
                    <span class="font-bold">{{ (subject as any)?.class?.subjectId }}</span>
                  </div>
                </td>
                <td>
                  <div class="flex items-center space-x-3">
                    <span class="font-bold">{{ (subject as any)?.class?.subjectName }}</span>
                  </div>
                </td>
                <td>
                  <div class="flex items-center space-x-3">
                    <span class="font-bold">{{ (subject as any)?.class?.code }}</span>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="3">Không có lớp</td>
              </tr>
            </template>
          </tbody>
        </table>

        <!-- calendar table -->
        <table id="calendar-table" class="table table-compact w-full table-fixed rounded-lg overflow-hidden">
          <tbody>
            <template v-if="true">
              <template v-for="date, dateIndex in calendar.dateList">
                <template v-if="new Date(date).getDay() === 1">
                  <SessionBar />
                </template>
                <tr>
                  <td colspan="2" class="text-xs text-center">
                    <span class="font-bold text-lg">
                      {{ dayOfWeekMap[new Date(date).getDay()] }}
                    </span><br />
                    {{ new Date(date).toLocaleDateString("vi") }}
                  </td>
                  <template v-for="session in sessions">
                    <td class="px-2"
                      :class="{ 'bg-neutral': checkSession(session) === 'afternoon', 'bg-neutral-focus': checkSession(session) === 'evening' }">
                      <template v-if="calendarTableContent[date][session].length">
                        <div class="dropdown w-full"
                          :class="{ 'dropdown-end': ['afternoon', 'evening'].includes(checkSession(session)), 'dropdown-top': dateIndex === calendar.dateList.length - 1 }">
                          <button tabindex="0" class="btn btn-primary btn-sm w-full text-center p-0 flex content-center"
                            :class="{ 'btn-accent': calendarTableContent[date][session].length > 1 }">
                            {{ calendarTableContent[date][session].map((item: any) => item.subjectId).join('\n') }}
                          </button>
                          <ul tabindex="0"
                            class="dropdown-content menu p-4 mt-1 text-neutral text-neural-focus rounded-lg z-50 w-[20rem]"
                            :class="{ 'bg-primary': calendarTableContent[date][session].length === 1, 'bg-accent-focus': calendarTableContent[date][session].length > 1 }">
                            <template v-for="sessionContentDetail in calendarTableContent[date][session]">
                              <li class="text-lg"
                                :class="{ 'text-base-100': calendarTableContent[date][session].length > 1 }">
                                {{ calendarTableContent[date][session].length === 1 ? '' :
                                  '-' }} Môn: {{ sessionContentDetail.defaultName }}
                              </li>
                            </template>
                          </ul>
                        </div>
                      </template>
                    </td>
                  </template>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>

      <!-- message modal -->
      <label ref="modalBtn" for="my-modal" class="btn hidden">Open modal</label>
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-center">{{ modalMessage }}</h3>
          <div class="modal-action justify-center">
            <label for="my-modal" class="btn" @click="closeModel">OK</label>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<style>
.app {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  max-width: 72rem;
  min-width: 60rem;
  margin: 0 auto;
  box-sizing: border-box;
}

#calendar-table-container::-webkit-scrollbar {
  width: 0.75rem;
}

#calendar-table-container::-webkit-scrollbar-track {
  background: transparent;
}

#calendar-table-container::-webkit-scrollbar-thumb {
  background: #d3d3d3;
  border-radius: 1rem;
}

#my-modal-4-content .modal-box::-webkit-scrollbar {
  width: 0.75rem;
}

#my-modal-4-content .modal-box::-webkit-scrollbar-track {
  background: transparent;
}

#my-modal-4-content .modal-box::-webkit-scrollbar-thumb {
  background: #d3d3d3;
  border-radius: 2rem;
}

.loading-box {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffffbf;
}

@media print {
  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .toolbar {
    display: none;
  }
}
</style>
