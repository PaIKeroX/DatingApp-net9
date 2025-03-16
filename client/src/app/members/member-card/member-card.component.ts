import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Member } from '@app/_models/member';
import { LikesService } from '@app/_services/likes.service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  private likeService = inject(LikesService);
  member = input.required<Member>();
  hasLiked = computed(() => this.likeService.likeIds().includes(this.member().id))

  toggleLikes() {
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update(ids => ids.filter(x => x!== this.member().id))
        }else {
          this.likeService.likeIds.update(ids => [...ids, this.member().id])
        }
      }
    })
  }

}
