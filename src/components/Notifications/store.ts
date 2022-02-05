import { createStore } from 'justorm/react';
import { nanoid } from 'nanoid';
import Time from 'timen';

import { sliceWhere } from 'tools/array';

const SHOW_TIME = 5000;
const ANIMATION_DURATION = 200;

type ID = string;

const STORE = createStore('notifications', {
  items: [] as ID[],
  autohide: [] as ID[],
  data: {},
  paused: false,
  show(data) {
    const id = nanoid();

    this.items.push(id);
    this.data[id] = {
      ...data,
      createdAt: Date.now(),
    };

    Time.after(ANIMATION_DURATION, () => (this.data[id].visible = true));

    if (data.autohide !== false) {
      this.autohide.push(id);
    }

    return id;
  },
  pause() {
    this.paused = true;
    this.pausedAt = Date.now();
  },
  unpause() {
    const pauseTime = Date.now() - this.pausedAt;

    this.autohide.forEach(id => {
      this.data[id].createdAt += pauseTime;
    });

    this.paused = false;
  },
  close(id) {
    this.data[id].visible = false;
    Time.after(ANIMATION_DURATION, () => this.remove(id));
  },
  remove(id) {
    sliceWhere(this.autohide, id);
    sliceWhere(this.items, id);
    delete this.data[id];
  },
});

// worker
Time.tick(function tick() {
  const { paused, autohide, data } = STORE;

  if (paused || autohide.length === 0) {
    return;
  }

  const id = autohide[0]; // TODO: move trough all autohide until some will !readyToHide
  const item = data[id];
  const readyToHide = Date.now() - item.createdAt > SHOW_TIME;

  if (item.visible && readyToHide) {
    item.visible = false;
    Time.after(ANIMATION_DURATION, () => STORE.remove(id));
  }
});

export default STORE;
