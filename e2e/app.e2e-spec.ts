import { AngularHero1Page } from './app.po';

describe('angular-hero1 App', () => {
  let page: AngularHero1Page;

  beforeEach(() => {
    page = new AngularHero1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
