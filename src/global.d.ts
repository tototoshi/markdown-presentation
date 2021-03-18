import { EventEmitter } from "events";

declare global {
  var __markdown_presentation_events__: EventEmitter | undefined;
  var __markdown_presentation_source__: string;
}
