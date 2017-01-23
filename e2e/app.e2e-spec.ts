import { CalculCreditPage } from './app.po';

describe('calcul-credit App', function() {
  let page: CalculCreditPage;

  beforeEach(() => {
    page = new CalculCreditPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
