import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent {
  tableHeaders = [
    'Invitado',
    'Apellido',
    '# Lugares',
    'Whatsapp',
    'Envio',
    'Status',
    'Invitacion Web',
    'Acciones',
  ];

  tableData = [
    [
      'Alison',
      'Rangel',
      '3',
      '+5218888888888',
      'Sí',
      'Confirmado',
      'Link',
      '[Editar] [Eliminar]',
    ],
    [
      'Zoy',
      'Mendoza',
      '1',
      '+5219999999999',
      'No',
      'Pendiente',
      'Link',
      '[Editar] [Eliminar]',
    ],
    [
      'Daniel',
      'Escareño',
      '2',
      '+521777777777',
      'No',
      'Cancelado',
      'Link',
      '[Editar] [Eliminar]',
    ],
  ];

  searchTerm: string = '';

  get filteredTableData(): string[][] {
    return this.tableData.filter((row) =>
      row.some((cell) =>
        cell.toLowerCase().includes(this.searchTerm.toLowerCase()),
      ),
    );
  }
}
