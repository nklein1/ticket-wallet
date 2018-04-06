import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from 'components/Button/Button.jsx';
import styles from './TicketOrder.scss';

class TicketOrder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      invoiceBaseURI: 'https://www.aceticket.com/orders/view-invoice/'
    }
  }

  // Convert raw string datetime into 12hr datetime string
  parseTimestamp = () => {
    let date = new Date(this.props.data.Event_Date);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  // Rounds price float to nearest cent
  parsePricing = (priceToParse) => {
    return parseFloat(priceToParse).toFixed(2);
  }

  // Returns appropriate Ticket Delivery elements
  displayDeliveryMsg = () => {
    if (this.props.data.HasPDF == '1') {
      return (
        <div className={styles.deliveryLabel}>
          <span className={'glyphicon glyphicon-print'} aria-hidden="true"></span>
          <span className={styles.deliveryText}> Print at Home </span>
        </div>
      );
    } else if (this.props.data.HasMobile == '1') {
      return (
        <div className={styles.deliveryLabel}>
          <span className={'glyphicon glyphicon-qrcode'} aria-hidden="true"></span>
          <span className={styles.deliveryText}> Mobile QR Code </span>
        </div>
      );
    } else if (this.props.data.apponly == '1') {
      return (
        <div className={styles.deliveryLabel}>
          <span className={'glyphicon glyphicon-phone'} aria-hidden="true"></span>
          <span className={styles.deliveryText}> Smartphone Entry </span>
        </div>
      );
    }
  }

  // Returns appropriate Action elements
  displayActionBtn = () => {
    if (this.isDateUpcoming() == false) {
      return (
        <Button className={styles.actionBtn}>
          Provide feedback on your experience
        </Button>
      );
    } else if (this.props.data.order_status !== 'Completed') {
      return (
        <Button className={styles.actionBtn} disabled={'disabled'}>
          Please wait, payment processing...
        </Button>
      );
    } else if (this.props.data.HasPDF == '1') {
      return (
        <Button className={styles.actionBtn} hasIcon={'glyphicon-print'}>
          Download Printable Tickets
        </Button>
      );
    } else if (this.props.data.HasMobile == '1') {
      return (
        <Button className={styles.actionBtn} hasIcon={'glyphicon-qrcode'}>
          Load QR Code
        </Button>
      );
    } else if (this.props.data.apponly == '1') {
      return (
        <Button className={styles.actionBtn} hasIcon={'glyphicon-phone'}>
          Access Tickets on External Site
        </Button>
      );
    }
  }

  // Utility for determining if the event will occur in the future or past
  isDateUpcoming = () => {
    const curDate = (new Date).getTime();
    if (Date.parse(this.props.data.Event_Date) > curDate) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className={styles.orderContainer}>
        <div className={styles.row}>
          <div className={styles.eventDate}>
            { this.parseTimestamp() }
          </div>
          <div className={styles.orderID}>
            <span>Order: </span>
            <a href={this.state.invoiceBaseURI+this.props.data.Invoice_ID} target={'blank'}>
              #{ this.props.data.Invoice_ID }
            </a>
          </div>
        </div>

        <div className={styles.row}>
          <span className={styles.eventName}>
            { this.props.data.Event_Name }
          </span>
          <span className={styles.totalCost}>
            <span>Total Price: </span>
            <span className={styles.costAmount}>
              ${ this.parsePricing(this.props.data.invoice_total) }
            </span>
          </span>
        </div>

        <div className={styles.rowSm}>
          <span>
            <a href={this.state.invoiceBaseURI+this.props.data.Invoice_ID} target={'blank'}>
              View Order Details
            </a>
          </span>
          <span className={styles.totalCost}>
            <span>Ticket Qty: </span>
            <span className={styles.costAmount}>
              { this.props.data.ticket_quantity }
            </span>
          </span>
        </div>

        <hr />

        <div className={styles.row}>
          <div className={styles.deliveryType}>
            <span>Delivery Method: </span>
            { this.displayDeliveryMsg() }
          </div>
            { this.displayActionBtn() }
        </div>
      </div>
    );
  }
}

export { TicketOrder };
export default TicketOrder;
