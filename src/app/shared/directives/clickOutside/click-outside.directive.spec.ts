import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';

import { Component, DebugElement, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: `
    <div appClickOutside>
      <p id="inner-p">text</p>
      <span id="inner-span">text</span>
      <div id="inner-div">text</div>
    </div>
    <div id="sibling-div"></div>
  `,
  imports: [ClickOutsideDirective],
})
export class TestComponent {}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: ClickOutsideDirective;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickOutsideDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    debugElement = fixture.debugElement.query(
      By.directive(ClickOutsideDirective),
    );
    directive = debugElement.injector.get(ClickOutsideDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit event when there is a click outside the element', () => {
    spyOn(directive.appClickOutside, 'emit');
    const fakeEvent = new PointerEvent('click');

    document.body.click();

    expect(directive.appClickOutside.emit).toHaveBeenCalledOnceWith(fakeEvent);
  });

  it('should emit when there is a click on a sibling element', () => {
    spyOn(directive.appClickOutside, 'emit');
    const siblingDiv = fixture.debugElement.query(By.css('#sibling-div'));
    const fakeEvent = new PointerEvent('click');

    siblingDiv.nativeElement.click();

    expect(directive.appClickOutside.emit).toHaveBeenCalledOnceWith(fakeEvent);
    expect(directive.appClickOutside.emit).toHaveBeenCalledOnceWith(fakeEvent);
  });

  it('should not emit when there is a click on an inner element', () => {
    spyOn(directive.appClickOutside, 'emit');
    const innerElement = fixture.debugElement.query(By.css('#inner-span'));

    innerElement.nativeElement.click();

    expect(directive.appClickOutside.emit).not.toHaveBeenCalled();
  });

  it('should not emit when there is a click on the element', () => {
    spyOn(directive.appClickOutside, 'emit');
    const selfElement = debugElement.nativeElement;

    selfElement.click();

    expect(directive.appClickOutside.emit).not.toHaveBeenCalled();
  });
});
