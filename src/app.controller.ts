import { Controller, Get } from '@nestjs/common';
import { FakeDataService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly fakeDataService: FakeDataService) {}

  @Get('/generate-data')
  async generateData(): Promise<string> {
    await this.fakeDataService.generateFakeData();
    return 'Fake data generated successfully';
  }
}
