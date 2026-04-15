import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-zuora-shell',
  imports: [RouterOutlet],
  templateUrl: './zuora-shell.html',
  styleUrl: './zuora-shell.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZuoraShell {
  private readonly route = inject(ActivatedRoute);

  readonly sectionTitle = computed(
    () => (this.route.snapshot.data['sectionTitle'] as string | undefined) ?? 'Services'
  );

  readonly accountId = computed(
    () => this.route.parent?.snapshot.paramMap.get('id') ?? this.route.snapshot.paramMap.get('id') ?? ''
  );
}
