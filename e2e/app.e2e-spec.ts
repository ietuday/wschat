import { WschatPage } from './app.po';

describe('wschat App', function() {
  let page: WschatPage;

  beforeEach(() => {
    page = new WschatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
