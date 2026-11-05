import { a as e, i as t, n, o as r, r as i, t as a } from "./index-Bvbm-5bX.js";
r(`firebase`, `12.19.0`, `app`);
function o() {
  let r =
    t().length > 0
      ? i()
      : e({
          apiKey: `AIzaSyDZjWC6ZWvhlD1yc041Gjmmf0R5YsF1-EM`,
          authDomain: `studlearn-1f81c.firebaseapp.com`,
          projectId: `studlearn-1f81c`,
          storageBucket: `studlearn-1f81c.firebasestorage.app`,
          messagingSenderId: `479873232786`,
          appId: `1:479873232786:web:5352c938b33171f8935b4b`,
          measurementId: `G-DNKNY38YCY`,
        });
  return { auth: n(r), provider: new a() };
}
export { o as getGoogleAuth };
