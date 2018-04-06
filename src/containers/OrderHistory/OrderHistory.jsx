import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import Header from 'components/Header/Header.jsx';
import TicketOrder from 'components/TicketOrder/TicketOrder.jsx';
import styles from './OrderHistory.scss';

import { sampleData } from '../../data/sample-data.js';

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderedtickets: [],
      upcomingEventsOrder: 'eventDesc',
      pastEventsOrder: 'eventDesc',
      sortOptions: {
        eventDesc: 'Event Date (Descending)',
        eventAsc: 'Event Date (Ascending)',
        priceDesc: 'Total Price (Descending)',
        priceAsc: 'Total Price (Ascending)'
      }
    }
  }

  // Save sample data to component state
  componentDidMount() {
    this.setState({ orderedtickets: sampleData.data });
  }

  // Updates Upcoming Orders sort in component state
  sortUpcomingEvents = (selectedOrder) => {
    this.setState({ upcomingEventsOrder: selectedOrder });
  }

  // Updates Past Orders sort in component state
  sortPastEvents = (selectedOrder) => {
    this.setState({ pastEventsOrder: selectedOrder });
  }

  // Creates "Sort By" button
  renderSortButton = (eventType) => {
    let sortCallback, placeholder;
    if (eventType == 'upcoming') {
      placeholder = this.state.sortOptions[this.state.upcomingEventsOrder];
      sortCallback = this.sortUpcomingEvents;
    } else if (eventType == 'past') {
      placeholder = this.state.sortOptions[this.state.pastEventsOrder];
      sortCallback = this.sortPastEvents;
    }

    let sortButton = (
      <DropdownButton
          bsStyle={'default'}
          title={placeholder}
          key={3}
          id={`dropdown-basic-${3}`}>
        <MenuItem
            eventKey={'eventDesc'}
            onSelect={ sortCallback }>
          { this.state.sortOptions.eventDesc }
        </MenuItem>
        <MenuItem
            eventKey={'eventAsc'}
            onSelect={ sortCallback }>
          { this.state.sortOptions.eventAsc }
        </MenuItem>
        <MenuItem
            eventKey={'priceDesc'}
            onSelect={ sortCallback }>
          { this.state.sortOptions.priceDesc }
        </MenuItem>
        <MenuItem
            eventKey={'priceAsc'}
            onSelect={ sortCallback }>
          { this.state.sortOptions.priceAsc }
        </MenuItem>
      </DropdownButton>
    )
    return sortButton;
  }

  // Sorts array of ticket orders according to order defined in component state
  parseSortOrder = (tickets, isEventUpcoming) => {
    let sortedArr, order;
    if (isEventUpcoming == true) {
      order = this.state.upcomingEventsOrder;
    } else if (isEventUpcoming == false) {
      order = this.state.pastEventsOrder;
    }

    if (tickets) {
      if (order == 'eventDesc') {
        sortedArr = tickets.sort((a,b) => Date.parse(a.Event_Date) + Date.parse(b.Event_Date) );
      } else if (order == 'eventAsc') {
        sortedArr = tickets.sort((a,b) => Date.parse(a.Event_Date) - Date.parse(b.Event_Date) );
      } else if (order == 'priceDesc') {
        sortedArr = tickets.sort((a,b) => a.invoice_total + b.invoice_total );
      } else if (order == 'priceAsc') {
        sortedArr = tickets.sort((a,b) => a.invoice_total - b.invoice_total );
      }
    }
    return sortedArr;
  }

  // Utility for determining if the event will occur in the future or past
  isDateUpcoming = (event) => {
    const curDate = (new Date).getTime();
    if (Date.parse(event.Event_Date) > curDate) {
      return true;
    }
    return false;
  }

  // Selectively return Upcoming or Past events
  renderEventsOfType = (isEventUpcoming) => {
    let ticketOrders = this.state.orderedtickets.filter(obj => {
      return this.isDateUpcoming(obj) == isEventUpcoming;
    });
    return this.renderEvents(ticketOrders, isEventUpcoming);
  }

  // Create array of ticket order info elements
  renderEvents = (ticketsArr, isEventUpcoming) => {
    let toRender = [];
    ticketsArr = this.parseSortOrder(ticketsArr, isEventUpcoming);
    if (ticketsArr.length > 0) {
      for (let i=0; i<ticketsArr.length; i++) {
        toRender.push(
          <TicketOrder
              data={ticketsArr[i]}
              className={styles.content}
              key={'ticket-'+i}>
          </TicketOrder>
        );
      }
    }
    return toRender;
  }

  render() {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <span className={styles.title}>Upcoming Events</span>
            { this.renderSortButton('upcoming') }
          </div>
          <div className={styles.sectionContent}>
            { this.renderEventsOfType(true) }
          </div>
          <div className={styles.sectionTitle}>
            <span className={styles.title}>Past Events</span>
            { this.renderSortButton('past') }
          </div>
          <div className={styles.sectionContent}>
            { this.renderEventsOfType(false) }
          </div>
        </div>
      </div>
    );
  }
}

export { OrderHistory };
export default OrderHistory;
