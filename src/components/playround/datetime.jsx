import React, { Fragment } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Select, { Option } from '@material/react-select';

const Datetime = (props) => {
    const [selectedDate, handleDateChange] = React.useState(new Date("2019-01-01T00:00"));
    const [value, Setvalue] = React.useState('pls select');
    const [value1, Setvalue1] = React.useState('pls select');
    return (
        <div>

            <Select
                label='Vui Lòng Chọn Bến Xe Đi'
                value={value}
                onChange={(evt) => Setvalue(evt.target.value)}
            >
                <Option value='pls select'>pls select</Option>
                <Option value='goldenDoodle'>Golden Doodle</Option>
            </Select>
            <br />
            <Select
                label='Vui Lòng Chọn Bến Xe Đến'
                value={value1}
                onChange={(evt) => Setvalue1(evt.target.value)}
            >
                <Option value='pls select'>pls select</Option>
                <Option value='goldenDoodle'>Golden Doodle</Option>
            </Select>
            <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        ampm={false}
                        label="Chon Thoi Gian"
                        value={selectedDate}
                        onChange={handleDateChange}
                        // onError={console.log}
                        disablePast
                        format="dd/MM/yyyy hh:mm a"
                    />
                </MuiPickersUtilsProvider>
        </div>
    );
};

export default Datetime;

