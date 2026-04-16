import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '@eh-library/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-setting-tab',
  imports: [ReactiveFormsModule, TextareaComponent],
  template: `
    <section class="settings-card section-card">
      <div class="general-setting-header">
        <h1 class="heading-band h1">{{ sectionTitle() }}</h1>
        <p class="section-copy">
          Tab content for {{ sectionTitle() }} is now routed through the shared General Settings sub-header.
        </p>
      </div>

      <div class="section-placeholder">
        <p>Account ID: {{ accountId() }}</p>
        <p>Use this route as the destination for the {{ sectionTitle() }} settings form or table.</p>
      </div>

      <div style="margin-top: 1.5rem;">
        <div style="background: #fff; border-radius: 1rem; border: 1px solid #e2e8f0; box-shadow: 0 12px 30px rgba(15,23,42,0.08); padding: 1rem;">
          <h3 style="font-size: 0.9375rem; font-weight: 600; color: #0f172a; margin: 0.25rem 0 0.75rem 0.125rem; padding-bottom: 0.75rem; border-bottom: 1px solid #e2e8f0;">Account Notes</h3>
          <div style="margin-top: 1rem;">
            <eh-textarea
              [formGroup]="accountNotesForm"
              fControlName="accountNotes"
              label=""
              placeholder="Enter any notes about this account..."
            ></eh-textarea>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-card {
      display: grid;
      gap: 1rem;
      padding: 1.5rem;
    }

    .section-copy {
      margin: 0;
      color: #475569;
    }

    .section-placeholder {
      border: 1px dashed #cbd5e1;
      border-radius: 1rem;
      background: #f8fafc;
      padding: 1rem 1.25rem;
      color: #334155;
    }

    .section-placeholder p {
      margin: 0;
    }

    .section-placeholder p + p {
      margin-top: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSettingTab {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly accountNotesForm = this.fb.group({ accountNotes: [''] });

  readonly sectionTitle = computed(() => this.route.snapshot.data['sectionTitle'] as string ?? 'General Settings');
  readonly accountId = computed(() => this.route.snapshot.paramMap.get('id') ?? this.route.parent?.snapshot.paramMap.get('id') ?? '');
}