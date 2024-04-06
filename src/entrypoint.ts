import type { Alpine } from 'alpinejs';
import anchor from '@alpinejs/anchor';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';
import mask from '@alpinejs/mask';
import morph from '@alpinejs/morph';
import slug from 'alpinejs-slug'
import persist from '@alpinejs/persist'

export default (Alpine: Alpine) => {
  Alpine.plugin(anchor);
  Alpine.plugin(collapse);
  Alpine.plugin(focus);
  Alpine.plugin(intersect);
  Alpine.plugin(mask);
  Alpine.plugin(morph);
  Alpine.plugin(slug);
  Alpine.plugin(persist);
};