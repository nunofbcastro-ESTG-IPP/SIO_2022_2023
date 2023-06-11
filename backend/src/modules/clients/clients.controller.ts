import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Customer } from '@prisma/client';
import { MetricsDto } from '@/common/dto/metrics.dto';
import { MetricsQuantitySortDto } from '@/common/dto/metrics-quantity-sort.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('rank-clients')
  async rankClients(@Query() metricsQuantitySortDto: MetricsQuantitySortDto) {
    return this.clientsService.rankClients(metricsQuantitySortDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('active-clients')
  async activeClients(@Query() metricsDto: MetricsDto): Promise<Customer[]> {
    return this.clientsService.activeClients(metricsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('new-clients')
  async numberNewClients(@Query() metricsDto: MetricsDto): Promise<number> {
    return this.clientsService.numberNewClients(metricsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('new-clients-history')
  async newClientsHistory(@Query() metricsDto: MetricsDto) {
    return this.clientsService.newClientsHistory(metricsDto);
  }
}
