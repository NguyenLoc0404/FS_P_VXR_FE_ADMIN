import React from 'react';
import Select, { Option } from '@material/react-select';
import { KeyboardDateTimePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'pls select',
            value1: 'pls select',
            selectedDate: new Date("2019-01-01T18:54")
        };
    }
    onChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    render() {
        return (
            <div>
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        inputVariant="outlined"
                        label="Chon Thoi Gian"
                        value={this.state.selectedDate}
                        onChange={(e) => {
                            this.setState({ selectedDate: e })
                        }}
                        onError={console.log}
                        disablePast
                        format="dd/MM/yyyy hh:mm a"
                    />
                </MuiPickersUtilsProvider>
                <Select
                    label='Chọn Bến Xe Đi'
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                >
                    <Option value='pls select'>pls select</Option>
                    <Option value='goldenDoodle'>Golden Doodle</Option>
                </Select>
                <br />
                <Select
                    label='Chọn Bến Xe Đến'
                    value={this.state.value1}
                    onChange={(e) => this.setState({ value1: e.target.value })}
                >
                    <Option value='pls select'>pls select</Option>
                    <Option value='goldenDoodle'>Golden Doodle</Option>
                </Select>
        
            </div>
        );
    }
}
export default MyApp;