import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F10]">
      <div className="w-full max-w-md rounded-lg bg-[#0F0F10] p-8 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-white">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign up to start managing your media content
        </p>

        {/* Sign Up Form */}
        <div className="mt-6">
          <SignUp
            appearance={{
              elements: {
                card: "bg-[#1D232A] shadow-lg",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton: "bg-[#29292E] hover:bg-[#3A3A42] text-white border-none",
                formFieldInput: "bg-[#29292E] text-white border-gray-700",
                formFieldLabel: "text-gray-300",
                formButtonPrimary: "bg-[#6C5DD3] hover:bg-[#5B4BC9] text-white",
                footerActionText: "text-gray-400",
                footerActionLink: "text-[#6C5DD3] hover:underline",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
