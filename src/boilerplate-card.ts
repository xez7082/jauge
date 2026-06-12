import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

@customElement('boilerplate-card')
export class BoilerplateCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: any;

  // Configuration initiale
  public setConfig(config: any): void {
    if (!config.entity) {
      throw new Error('Vous devez définir une entité (entity).');
    }
    this.config = config;
  }

  protected render() {
    // Récupération de l'état
    const stateObj = this.hass.states[this.config.entity];
    const value = stateObj ? stateObj.state : '0';

    // Rendu SVG (Cyberpunk style)
    return html`
      <ha-card>
        <div class="container">
          <svg viewBox="0 0 200 60">
            <text x="50%" y="30" class="temp-text" text-anchor="middle">
              ${value} °C
            </text>
            <line x1="10" y1="45" x2="190" y2="45" stroke="#00d4ff" stroke-width="2" />
          </svg>
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .temp-text {
        fill: #00d4ff;
        font-family: 'Orbitron', sans-serif;
        font-size: 22px;
        font-weight: bold;
        filter: drop-shadow(0 0 8px #00d4ff);
      }
    `;
  }
}
