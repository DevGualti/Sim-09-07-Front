import { Component, OnInit } from '@angular/core';
import { EventsService, Event } from '../../services/events.service';
import { InscriptionsService, Inscription } from '../../services/inscriptions.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  events: Event[] = [];
  eventMap: { [id: string]: Event } = {};
  inscriptions: Inscription[] = [];
  loadingEvents = false;
  loadingInscriptions = false;
  error: string = '';
  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private eventsService: EventsService,
    private inscriptionsService: InscriptionsService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEventsAndInscriptions();
  }

  loadEventsAndInscriptions() {
    this.loadingEvents = true;
    this.loadingInscriptions = true;
    this.eventsService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.eventMap = {};
        for (const e of events) {
          this.eventMap[e.id!] = e;
        }
        this.loadingEvents = false;
        this.loadInscriptions();
      },
      error: () => {
        this.error = 'Errore nel caricamento eventi';
        this.loadingEvents = false;
        this.loadingInscriptions = false;
      }
    });
  }

  loadInscriptions() {
    this.inscriptionsService.getUserInscriptions().subscribe({
      next: (inscriptions) => {
        this.inscriptions = inscriptions;
        this.loadingInscriptions = false;
      },
      error: () => {
        this.error = 'Errore nel caricamento iscrizioni';
        this.loadingInscriptions = false;
      }
    });
  }

  isSubscribed(eventId: string): boolean {
    return this.inscriptions.some(i => i.idEvent === eventId);
  }

  subscribe(eventId: string) {
    this.inscriptionsService.addInscription(eventId).subscribe({
      next: () => this.loadInscriptions(),
      error: () => this.error = 'Errore durante l\'iscrizione'
    });
  }

  unsubscribe(inscriptionId: string) {
    this.inscriptionsService.deleteInscription(inscriptionId).subscribe({
      next: () => this.loadInscriptions(),
      error: () => this.error = 'Errore durante l\'annullamento'
    });
  }

  getEventTitle(eventId: string): string {
    return this.eventMap[eventId]?.title || eventId;
  }

  getEventTitleFromIns(ins: any): string {
    if (ins.idEvent && typeof ins.idEvent === 'object' && 'title' in ins.idEvent) {
      return ins.idEvent.title;
    }
    return 'Evento non disponibile';
  }

  isAlreadyRegistered(eventId: string): boolean {
    return this.inscriptions.some(ins => {
      const idEvent = ins.idEvent as any;
      if (idEvent && typeof idEvent === 'object' && 'id' in idEvent) {
        return idEvent.id === eventId;
      }
      return String(idEvent) === String(eventId);
    });
  }
} 