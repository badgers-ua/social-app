import { getAuth } from 'firebase/auth';
import {
  AuthProvider,
  FirebaseAppProvider,
  SuspenseWithPerf,
  useFirebaseApp,
} from 'reactfire';
import { Children } from '../types';

const firebaseConfig = {
  apiKey: 'AIzaSyARIQSBdttHvBSKoOM577i8hAXeUWnbpYs',
  authDomain: 'social-app-dev-a4332.firebaseapp.com',
  projectId: 'social-app-dev-a4332',
  storageBucket: 'social-app-dev-a4332.appspot.com',
  messagingSenderId: '861812564212',
  appId: '1:861812564212:web:204f650d5806e70cadfea1',
};

const FirebaseProviderLocal = ({ children }: Children) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
      <SuspenseWithPerf traceId={'firebase-user-wait'} fallback={<></>}>
        <AuthProviderLocal>{children}</AuthProviderLocal>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
};

const AuthProviderLocal = ({ children }: Children) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

export default FirebaseProviderLocal;
