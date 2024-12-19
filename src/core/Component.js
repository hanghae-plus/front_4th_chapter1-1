export default class Component {
    $target;
    state;
    props;
    constructor($target, props = {}) {
        this.$target = $target;
        this.props = props;
        this.setup();
        this.render();
    };
    mounted() {};
    setup() {};
    template() {return "";};
    render() {
        this.$target.innerHTML = this.template();
        this.setEvent();
        this.mounted();
    };
    setEvent() {};
    setState(newState) {
        this.state = {...this.state, ...newState};
        this.render();
    };
}