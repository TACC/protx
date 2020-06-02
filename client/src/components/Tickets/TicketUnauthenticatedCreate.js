import React from 'react';
import { Navbar } from 'reactstrap';
import TicketCreateForm from './TicketCreateForm';
import './TicketUnauthenticatedCreate.scss';
import BrowserChecker from '../_common/BrowserChecker';

function TicketUnauthenticatedCreate() {
  return (
    <>
      <Navbar className="ticket-unauthenticated-title">Add Ticket</Navbar>

      <div className="ticket-unauthenticated-create-form">
        <BrowserChecker />
        <TicketCreateForm />
      </div>
    </>
  );
}

export default TicketUnauthenticatedCreate;