import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";



export default class App extends Component {

  state = {
    events: [
      { title: "Tarea 1", id: "1" },
      { title: "Tarea 2", id: "2" },
      { title: "Tarea 3", id: "3" },
      { title: "Tarea 4", id: "4" },
      { title: "Ensayo 1", id: "5" },
      { title: "Ensayo 2", id: "6" },
      { title: "Ensayo 3", id: "7" },
      { title: "Proyecto 1", id: "8" },
      { title: "Proyecto 2", id: "9" },
      { title: "Proyecto 3", id: "10" }
    ]
  };

  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });
  }

  eventClick = eventClick => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>Titulo</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Tiempo de Inicio</td>
      <td><strong>
      ` +
        eventClick.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remover Evento",
      cancelButtonText: "Cerrar"
    }).then(result => {
      if (result.value) {
        eventClick.event.remove();
        Alert.fire("Borrado!", "Su evento a sido borrado.", "éxito");
      }
    });
  };

  /* "animated fadeIn p-4 demo-app" */

  render() {
    return (
      <div className="body">
        <Row>
          <Col>
            <div className="header">
              StudEZ
            </div>
          </Col>
          <Col lg={3} sm={3} md={3}>
            <div
              id="external-events"
              style={{
                padding: "10px",
                width: "20%",
                height: "auto",
              }}
            >
              <p className="eventTitle1" align="center">
                <strong style={{ color: 'white' }}>Events</strong>
              </p>
              {this.state.events.map(event => (
                <div style={{ color: 'white' }}
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                >
                  {event.title}
                </div>
              ))}
            </div>
          </Col>

          <Col lg={9} sm={9} md={9}>
            <div className="calendar" id="mycalendartest">
              <FullCalendar
                defaultView="dayGridMonth"
                style={{
                  padding: "10px",
                  width: "90%",
                  height: "auto",
                }}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={this.drop}
                drop={this.drop}
                eventReceive={this.eventReceive}
                eventClick={this.eventClick}
                //selectable={true}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
/*
<FullCalendar
            
            plugins={[ dayGridPlugin ]}
            editable={true} 
            droppable={true}
            dateClick={this.handleDateClick}
            initialView="dayGridMonth"
            weekends={false}
            events={[
              { title: 'event 1', date: '2022-06-01' },
              { title: 'event 2', date: '2022-06-02' }
            ]}
          /> 
          */