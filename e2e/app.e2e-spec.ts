import { AppdSampleappAngular2Page } from './app.po';

describe('appd-sampleapp-angular2 App', function() {
  let page: AppdSampleappAngular2Page;

  beforeEach(() => {
    page = new AppdSampleappAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
