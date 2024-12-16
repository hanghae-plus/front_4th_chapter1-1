import { ProfileForm } from "../../../features/auth/profile";

function ProfilePage() {
  return `
    <main class="p-4">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
          내 프로필
        </h2>
        ${ProfileForm()}
      </div>
    </main>
  `;
}

export { ProfilePage as default };
