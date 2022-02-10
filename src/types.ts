import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'enhanced-template-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface EnhancedTemplatesCardConfig extends LovelaceCardConfig {
  type: string;
  hide_title?: boolean;
  hide_intro?: boolean;
  registry?: 'area' | 'entity' | 'person';
  test_gui?: boolean;
}

export interface EnhancedTemplatesConfigChangedEvent extends Event {
  detail: { config: EnhancedTemplatesCardConfig };
}

export interface HaPartialCustomElement extends HTMLElement {
  hass?: any;
  _updateRoutes: () => void;
  routerOptions: any;
  _computeParsedEventData: (yaml: string) => void;
  firstUpdated: (changedProps: object) => void;
}

export interface EnhancedArea {
  id: string;
  name?: string;
  original_name?: string;
  icon?: string;
  sort_order?: number;
  visible?: boolean;
}

export interface EnhancedEntity {
  entity_id: string;
  domain?: string;
  area_id?: string;
  original_area_id?: string;
  name?: string;
  entity_type?: string;
  original_entity_type?: string;
  sort_order?: number;
  visible?: boolean;
  disabled?: boolean;
}

export interface EnhancedPerson {
  id: string;
  name?: string;
  original_name?: string;
  sort_order?: number;
  visible?: boolean;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
}
