import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBusquedaComponent } from './detalle-busqueda.component';

describe('DetalleBusquedaComponent', () => {
  let component: DetalleBusquedaComponent;
  let fixture: ComponentFixture<DetalleBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBusquedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
