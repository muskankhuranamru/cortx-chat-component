import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CortxChatComponent } from './cortx-chat.component';
import { ChatUser } from './models/message.model';

describe('CortxChatComponent', () => {
  let component: CortxChatComponent;
  let fixture: ComponentFixture<CortxChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CortxChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CortxChatComponent);
    component = fixture.componentInstance;
    
    // Set required input
    const testUser: ChatUser = {
      id: 'test-user',
      name: 'Test User'
    };
    component.user = testUser;
    
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default theme as light', () => {
    expect(component.theme).toBe('light');
  });

  it('should accept user input', () => {
    expect(component.user).toBeDefined();
    expect(component.user.id).toBe('test-user');
  });

  it('should emit onMessageSend event', (done) => {
    component.onMessageSend.subscribe((message: string) => {
      expect(message).toBe('test message');
      done();
    });
    component.onMessageSend.emit('test message');
  });
});
