import React from 'react'
import { DatePicker, TimePicker, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

interface BanDatePickerProps {
   onStartDateChange: (date: Dayjs | null) => void
   onStartTimeChange: (time: Dayjs | null) => void
   onEndDateChange: (date: Dayjs | null) => void
   onEndTimeChange: (time: Dayjs | null) => void
}

const BanDatePicker: React.FC<BanDatePickerProps> = ({
   onStartDateChange,
   onStartTimeChange,
   onEndDateChange,
   onEndTimeChange,
}) => {
   return (
      <Space direction='vertical' size={12}>
         <Space>
            Від
            <DatePicker onChange={onStartDateChange} />
            <TimePicker onChange={onStartTimeChange} />
         </Space>
         <Space>
            До
            <DatePicker onChange={onEndDateChange} />
            <TimePicker onChange={onEndTimeChange} />
         </Space>
      </Space>
   )
}

export default BanDatePicker
