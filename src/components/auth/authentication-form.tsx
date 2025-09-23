"use client";

import { login, register } from "@/lib/auth/auth";
import { AppDispatch, RootState } from "@/lib/store";
import { countries } from "@/utils/utils";
import { Loader2Icon, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button";
import Card from "../shared/card";
import Input from "../shared/input";

function AuthenticationForm({ page }: { page: "login" | "register" }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.IsLoading);
  const router = useRouter();

  const handleSubmit = async () => {
    // Handle form submission
    if (page === "register") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Proceed with registration
    }
    if (!phone.startsWith("+255")) {
      toast.error("Phone number must start with +255");
      return;
    }
    if (phone.length < 8) {
      toast.error("Phone number is too short");
      return;
    }

    const data = {
      phone,
      password,
    };
    if (page === "register") {
      const res = await dispatch(register(data));
      if (res.meta.requestStatus === "fulfilled") {
        router.push("/login");
      }
    } 
    if(page === "login"){
      const res = await dispatch(login(data));
      if (res.meta.requestStatus === "fulfilled") {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (page === "register") {
      if (
        password.length === 0 &&
        confirmPassword.length === 0 &&
        password !== confirmPassword
      ) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
    if (phone && !phone.startsWith("+255") && phone.length < 8) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [phone, password, confirmPassword, showError, page]);

  const handlePhoneChange = (value: string) => {
    if (value.startsWith("+255")) {
      setPhone(value);
      setShowError(false);
      console.log(`${error} ${showError}`);
    } else {
      setShowError(true);
      setError("Phone number must start with +254");
    }
  };
  return (
    <div className="w-full max-w-md ">
      <Card className="px-8 pt-6 pb-8 mb-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Numbers Game
          </h1>
          <p className="text-gray-500 mb-4">
            {page === "login" ? "Welcome back" : "Create a new account"}
          </p>
        </div>
        <form className="space-y-2">
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="rounded-[5px] bg-gray-700 border border-orange-400 px-[1px] py-[1px] ">
              <PhoneInput
                inputStyle={{
                  borderColor: "#f97316",
                  borderBlockColor: "#374151",
                  borderBlock: "1px 1px 1px 1px",
                  width: "100%",
                  backgroundColor: `#374151`,
                  outlineColor: "#E5E4E2",
                  border: "none",
                  color: `#f9fafb`,
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
                defaultCountry="tz"
                countries={countries}
                forceDialCode={true}
                countrySelectorStyleProps={{
                  buttonStyle: {
                    backgroundColor: `#374151`,
                    color: `#f9fafb`,
                    border: "none",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingLeft: "10px",
                    paddingRight: "4px",
                    width: "100%",
                  },
                }}
                value={phone}
                onChange={handlePhoneChange}
                hideDropdown={true}
              />
            </div>
            {showError && (
              <p className="text-red-400 text-sm mt-1">
                {"Invalid phone number"}
              </p>
            )}
          </div>

          <Input
            type="password"
            label="Password"
            value={password}
            placeholder="Enter your password"
            required
            onChange={setPassword}
            Icon={Lock}
          />
          {passwordError && (
            <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
          )}

          {page === "register" && (
            <>
              <Input
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                placeholder="Confirm your password"
                required
                onChange={setConfirmPassword}
                Icon={Lock}
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
            </>
          )}
          {page === "login" && (
            <div className="text-right text-sm">
              <Link
                href="/forgot-password"
                className="text-orange-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {loading === "pending" ? (
            <div className="text-center mt-4">
              <Loader2Icon className="animate-spin h-6 w-6 text-orange-400 mx-auto" />
            </div>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="primary"
              className="w-full mt-4"
              disabled={
                page === "register"
                  ? !phone || !password || !confirmPassword || passwordError
                  : !phone || !password
              }
            >
              {page === "login" ? "Login" : "Register"}
            </Button>
          )}
          <div className="text-right text-sm mt-4">
            {page === "login" ? (
              <Link
                href="/register"
                className="text-orange-400 hover:underline"
              >
                Don&apos;t have an account? Register
              </Link>
            ) : (
              <Link href="/login" className="text-orange-400 hover:underline">
                Already have an account? Login
              </Link>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AuthenticationForm;
