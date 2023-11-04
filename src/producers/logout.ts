export const Logout: producer = ({
  isLogoutPressed = observe.isLogoutPressed,
  updateIsLogoutPressed = update.isLogoutPressed,
  updateUserId = update.userId,
}) => {
  if (!isLogoutPressed) return;
  updateUserId.set(2);
  localStorage.setItem("userId", "2");
  console.log("Logout pressed");
  updateIsLogoutPressed.set(false);
};
