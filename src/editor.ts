/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  css,
  internalProperty,
} from 'lit-element';
import {
  HomeAssistant,
  fireEvent,
  LovelaceCardEditor,
} from 'custom-card-helpers';

import { localize } from './localize/localize';
import { EnhancedTemplatesCardConfig } from './types';

@customElement('enhanced-templates-card-editor')
export class EnhancedTemplatesCardEditor
  extends LitElement
  implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @internalProperty() private _config?: EnhancedTemplatesCardConfig;
  @internalProperty() private _helpers?: any;
  private _initialized = false;

  public setConfig(config: EnhancedTemplatesCardConfig): void {
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  protected render(): TemplateResult | void {
    if (!this._helpers) {
      return html``;
    }

    // The climate more-info has ha-switch and paper-dropdown-menu elements that are lazy loaded unless explicitly done here
    this._helpers.importMoreInfoControl('climate');

    return html`
      <div class="card-config">
        <div class="values">
          <paper-dropdown-menu label="${localize('config.registry')}">
            <paper-listbox
              slot="dropdown-content"
              .selected=${this._config?.registry || 'area'}
              attr-for-selected="value"
              @selected-changed=${this._valueChanged}
              .configValue=${'registry'}
            >
              <paper-item value="area">${localize('area.one')}</paper-item>
              <paper-item value="entity">${localize('entity.one')}</paper-item>
              <paper-item value="person">${localize('person.one')}</paper-item>
            </paper-listbox>
          </paper-dropdown-menu>
          <div class="row">
            <ha-switch
              style="--mdc-theme-secondary:var(--switch-checked-color);"
              .checked=${!!this._config?.hide_title}
              @change=${this._valueChanged}
              .configValue=${'hide_title'}
            >
            </ha-switch>
            <div>
              <div>${localize('config.hide_title')}</div>
            </div>
          </div>
          <div class="row">
            <ha-switch
              style="--mdc-theme-secondary:var(--switch-checked-color);"
              .checked=${!!this._config?.hide_intro}
              @change=${this._valueChanged}
              .configValue=${'hide_intro'}
            >
            </ha-switch>
            <div>
              <div>${localize('config.hide_intro')}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChanged(ev): void {
    if (!this._config) return;

    const target = ev.target;

    if (!target.configValue) return;

    const value =
      target.configValue === 'registry' ? ev.detail.value : target.checked;

    if (value === this._config[target.configValue]) return;

    console.log(`value changed for ${target.configValue}: ${value}`);
    if (['', null, undefined].includes(value)) {
      delete this._config[target.configValue];
    } else {
      this._config = { ...this._config, [target.configValue]: value };
    }

    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResult {
    return css`
      .row {
        margin-bottom: 16px;
        margin-top: 16px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
      }

      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }

      ha-switch {
        margin-right: 16px;
      }
    `;
  }
}
