import Component from "../core/Component";

export default class Header extends Component {
    constructor($target, props) {
        super($target, props);
    }

    template() {
        const { routes } = this.props;
        return `
            <div class="bg-blue-600 text-white p-4 sticky top-0">
                <h1 class="text-2xl font-bold">항해플러스</h1>
            </div>
            <nav id="nav" data-component="navigator" class="bg-white shadow-md p-2 sticky top-14">
                <ul class="flex justify-around">
                    ${routes.map((route) => `
                        <li>
                            <a href="${route.path}" id=${route.id} class="text-blue-600">${route.name}</a>
                        </li>
                    `).join("")}
                </ul>
            </nav>
        `
    }

    setEvent() {
        document.querySelector("#nav").addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                e.preventDefault();
                const path = e.target.getAttribute("href");
                this.props.router.navigateTo(path);
            }
        })
    }
}
