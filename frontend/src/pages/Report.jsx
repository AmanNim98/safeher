import React from 'react';
import axios from 'axios';
import { Form, Input, Spin, Cascader, Button, DatePicker, TimePicker } from 'antd';
const FormItem = Form.Item;
var L = window.L;

let mapCenter = [28.4880472, 77.0653845];

const crimes = [
  { value: '1', label: 'Eve-teasing', },
  { value: '2', label: 'Snatching', },
  { value: '3', label: 'Stalking', },
  { value: '4', label: 'Street Harassment', },
  { value: '5', label: 'Sexual Assault', },
  { value: '6', label: 'Abuse', },
  { value: '7', label: 'Kidnapping', },
];

class ReportForm extends React.Component {
  state = {
    confirmDirty: false,
    latitude: mapCenter[0],
    longitude: mapCenter[1],
    category: null,
    date: null,
    time: null,
    description: '',
    busy: false,
  };

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    var mymap = L.map('mapid').setView(mapCenter, 25);
    var marker = L.marker(mapCenter).addTo(mymap);
    var updateMarker = (lat, lng) => {
      marker.setLatLng([lat, lng]);
      return false;
    };
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);
    this.setState({ mapObj: mymap }, () => {
      // mymap.locate({ setView: true }).on('locationfound', (e) => {
      //   this.setState({ mapObj: mymap, latitude: e.latitude, longitude: e.longitude }, () => updateMarker(e.latitude, e.longitude));
      // });
    });
    mymap.on('click', (e) => {
      this.setState({ mapObj: mymap, latitude: e.latlng.lat, longitude: e.latlng.lng }, () => updateMarker(e.latlng.lat, e.latlng.lng));
    });

  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  handleDateChange = (event) => {
    this.setState({ date: event.format("YYYY-MM-DD") });
  }

  handleTimeChange = (event) => {
    this.setState({ time: event.format("hh:mm:ss") });
  }

  handleCategoryChange = (event) => {
    this.setState({ category: event[0] });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { time, date, category, latitude, longitude, description } = this.state;
    this.setState({ busy: true }, () => {
      axios.post('/api/report/', {
        time,
        date,
        category,
        latitude,
        longitude,
        description,
      })
      .then((res) => {
        alert("successful");
      })
      .catch((err) => {
        alert("ERROR");
      })
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { category, date, time } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { TextArea } = Input;

    return (
      <div style={{ padding: '5%', }}>
      <div style={{width: '100%', marginBottom: '20px'}}>
        <center>
          <h2 style={{ marginBottom: 0, fontSize: 40 }}>  Report </h2>
          an incident
        </center>
      </div>
      <br/>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Category"
        >
          {getFieldDecorator('category', {
            rules: [{ type: 'array', required: true, message: 'Please select a category!' }],
          })(
            <Cascader options={crimes} onChange={this.handleCategoryChange} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Date"
        >
          {getFieldDecorator('date', {
            rules: [{
              required: true, message: 'Please select the date!',
            }],
          })(
            <DatePicker onChange={this.handleDateChange} style={{width: '100%'}}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Time"
        >
          {getFieldDecorator('time', {
            rules: [{
              required: true, message: 'Please select the time!',
            }],
          })(
            <TimePicker onChange={this.handleTimeChange} style={{width: '100%'}} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Location"
        >
          {getFieldDecorator('location', {})(
            <div style={{width: '100%', height: '200px'}}>
              <div id="mapid" style={{width: '100%', height: '100%'}}></div>
            </div>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Description"
        >
          {getFieldDecorator('description', {})(
            <TextArea rows={4} onChange={this.handleDescriptionChange} style={{width: '100%'}} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {this.state.busy ? <Spin /> : <Button type="primary" disabled={category === null || date === null || time === null} htmlType="submit">Submit</Button>
          }
        </FormItem>
      </Form>
      </div>
    );
  }
}

const Report = Form.create()(ReportForm);

export default Report;
