const TAB_STYLE = {
  active: "text-blue-600",
  inactive: "text-gray-600",
};

const NavTab = ({ path, label, active = false }) => {
  return `
    <li>
      <a href=${`/${path}`} id="${path}" data-path="${path}" 
      class="font-bold ${active ? TAB_STYLE.active : TAB_STYLE.inactive}">${label}</a>
    </li>
  `;
};

export default NavTab;
