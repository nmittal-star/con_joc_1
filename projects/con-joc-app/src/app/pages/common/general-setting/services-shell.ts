import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-services-shell',
  imports: [RouterOutlet],
  templateUrl: './services-shell.html',
  styleUrls: ['./services-shell.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesShell {
  private readonly route = inject(ActivatedRoute);

  readonly sectionTitle = computed(
    () => (this.route.snapshot.data['sectionTitle'] as string | undefined) ?? 'Services'
  );

  readonly accountId = computed(
    () => this.route.parent?.snapshot.paramMap.get('id') ?? this.route.snapshot.paramMap.get('id') ?? ''
  );
}