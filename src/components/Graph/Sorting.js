import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { START_DATE, END_DATE } from "react-dates/constants";
import moment from "moment";
import axios from "axios";
import lodash from "lodash";
import DataChart from "./DataChart";
import TableSort from "../Table/TableSort";
import "../../CSS/Sort.css";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(4, "month"),
      endDate: moment(),
      focusedInput: null,
      docs: [],
      name: "Tất Cả",
      hidden: false,
      maxCount: 0,
      sort: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            borderColor: "",
          },
        ],
      },
    };
  }

  onDatesChange = ({ startDate, endDate }) =>
    this.setState({ startDate, endDate });

  onFocusChange = (focusedInput) => this.setState({ focusedInput });

  isOutsideRange = () => {
    return null;
  };

  renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    let i;
    let years = [];
    for (i = moment().year(); i >= moment().year() - 100; i--) {
      years.push(
        <option value={i} key={`year-${i}`}>
          {i}
        </option>
      );
    }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <select
            value={month.month()}
            onChange={(e) => onMonthSelect(month, e.target.value)}
          >
            {moment.months().map((label, value) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={month.year()}
            onChange={(e) => onYearSelect(month, e.target.value)}
          >
            {years}
          </select>
        </div>
      </div>
    );
  };

  componentDidMount() {
    axios.get("http://localhost:8000/getDataSort").then((info) => {
      const docs = Object.keys(lodash.groupBy(info.data, "name"));
      this.setState({ docs });
    });
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSort = async (e) => {
    try {
      e.preventDefault();
      var start = new Date(this.state.startDate._d);
      var end = new Date(this.state.endDate._d);
      var startDate = (start.getMonth() + 1) + "/" + start.getDate() + "/" + start.getFullYear();

      var endDate = (end.getMonth() + 1) + "/" +  end.getDate() + "/" + end.getFullYear();

      const dataSort = {
        startDate: startDate,
        endDate: endDate,
        name: this.state.name,
      };

      const response = await axios.post("http://localhost:8000/sort", dataSort);
      if (!response) return;
      const sort = response.data || [];
      await this.setState({ hidden: true, sort });
      await this.chart();
    } catch (ex) {
      console.log(ex);
    }
  };

  //CHART SECTION

  chart = async () => {
    let response = await axios.get("http://localhost:8000/getColor");
    var dataColor = response.data;
    var datasets = [];
    var arrInit = this.state.sort;
    var arrDate = [...new Set(arrInit.map((x) => x.date))];
    var arrDateFm = [...new Set(arrInit.map((x) => x.date.split("T")[0]))];

    dataColor.forEach((color) => {
      var svName = color["name"];
      var colorChart = color["color"];
      var data = [];
      // console.log(svName)
      arrDate.forEach((date) => {
        //console.log(date.split("T")[0])
        var cnt = arrInit.findIndex(
          (e) => e["name"] === svName && e["date"] === date
        );
        var count = 0;

        if (cnt > 0) {
          count = arrInit[cnt]["count"];
        }
        data.push(count);
      });
      datasets.push({
        label: svName,
        data: data,
        borderColor: colorChart,
        fill: false,
      });
    });

    var dataCount = [];

    arrInit.map((infoCount) => {
      if (dataCount.indexOf(infoCount.count) === -1) {
        dataCount.push(infoCount.count);
      }
    });

    this.state.maxCount = dataCount.reduce((a, b) => {
      return Math.max(a, b);
    }, 0);

    var chartData = {};
    chartData.labels = arrDateFm;
    chartData.datasets = datasets;
    this.setState({ chartData });
  };

  render() {
    const { startDate, endDate, focusedInput } = this.state;
    return (
      <div className="Sort">
        <h5>Chọn Dịch Vụ: </h5>
        <Container>
          <Row>
            <Col md={{ size: 2, offset: 5 }}>
              <Form>
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    id="Select"
                    onChange={this.onChangeName}
                  >
                    <option defaultValue={this.state.name}>Tất Cả</option>
                    {this.state.docs.map((data, i) => (
                      <option key={i}>{data}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
        <h5>Chọn Thời Gian: </h5>
        <div style={{ marginLeft: "40px" }}>
          <DateRangePicker
            displayFormat="DD/MM/YYYY"
            startDate={startDate}
            startDateId={START_DATE}
            endDate={endDate}
            endDateId={END_DATE}
            onDatesChange={this.onDatesChange}
            focusedInput={focusedInput}
            onFocusChange={this.onFocusChange}
            daySize={50}
            noBorder={true}
            isOutsideRange={this.isOutsideRange}
            orientation="vertical"
            verticalHeight={500}
            renderMonthElement={this.renderMonthElement}
          />
        </div>
        <Button
          color="dark"
          style={{ marginTop: "30px" }}
          onClick={(e) => {
            this.handleSort(e);
          }}
        >
          Tìm Kiếm
        </Button>
        {this.state.hidden && <TableSort sort={this.state.sort || []} />}
        {/* Replace DataTable for pagination */}
        {this.state.hidden && (
          <DataChart
            sort={this.state.chartData}
            maxCount={this.state.maxCount}
          />
        )}
      </div>
    );
  }
}

export default Sorting;
