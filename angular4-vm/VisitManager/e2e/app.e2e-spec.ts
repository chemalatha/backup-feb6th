import { VisitManagerPage } from './app.po';

describe('visit-manager App', () => {
  let page: VisitManagerPage;

  beforeEach(() => {
    page = new VisitManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
