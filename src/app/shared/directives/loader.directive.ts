import {
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  inject,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Directive({
  selector: '[appLoader]',
  standalone: true,
})
export class LoaderDirective implements OnInit {
  /**
   * allow us to reference some templates
   */
  private readonly templateRef = inject(TemplateRef);
  /**
   * to create components dynamically
   */
  private readonly vcRef = inject(ViewContainerRef);

  appLoader = input<boolean | null>(false);

  /**
   * used to store the reference to the template that we get
   */
  templateView: EmbeddedViewRef<any> | undefined;
  /**
   * used to store the reference to the ComponentRef instance that we are going to create
   */
  loaderRef: ComponentRef<LoaderComponent> | undefined;

  ngOnInit(): void {
    this.createComponent();
  }
  // We need to ensure change detection still works on the projected
  // template despite it being "detached" from the parent view and projected into a new component.
  // We will use ngDoCheck for this
  ngOnChanges() {
    this.loaderRef?.setInput('loading', this.appLoader());
  }
  ngDoCheck() {
    this.templateView?.detectChanges();
  }
  createComponent() {
    // Make the template into an embedded view, so we can render it dynamically
    this.templateView = this.templateRef.createEmbeddedView({});
    // Create a LoaderComponent instance
    this.loaderRef = this.vcRef.createComponent(LoaderComponent, {
      injector: this.vcRef.injector,
      // Project the template into the LoaderComponent instance via projectableNodes
      projectableNodes: [this.templateView.rootNodes],
    });

    // Set the loading input property on the LoaderComponent instance
    this.loaderRef.setInput('loading', this.appLoader());
  }
}
