import { NotFoundTemplate } from "../templates/NotFoundTemplate.js";
import { Component } from "../utils/lib/component.js";

class NotFoundPage extends Component {
  constructor() {
    super();
  }

  render() {
    this.setHTMLContent(NotFoundTemplate());
  }
}

export const notFoundPage = new NotFoundPage();
