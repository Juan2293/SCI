import { SCIPage } from './app.po';

describe('sci App', () => {
  let page: SCIPage;

  beforeEach(() => {
    page = new SCIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
