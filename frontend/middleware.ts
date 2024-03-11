import { NextRequest, NextResponse } from 'next/server';

const AUTH_PAGES = ['/login', '/register', '/forgot-password'];
const DOCTOR_PAGES = [
  '/dashboard/patient-list',
];
const AUTH_NEED_PAGES = [
  '/dashboard',
]
const isAuthPages = (url: URL) =>
  AUTH_PAGES.some((page) => url.pathname.startsWith(page));

const isDoctorPages = (url: URL) =>
  DOCTOR_PAGES.some((page) => url.pathname.startsWith(page));

const isAuthNeedPages = (url: URL) =>
  AUTH_NEED_PAGES.some((page) => url.pathname.startsWith(page));


const getToken = (cookies : any ) => {
  const { value: token } = cookies.get('token') ?? { value: null };
  return token;
}

const me = async (token: string) => {
  const response = await fetch('http://api:8000/api/v1/auth/me', {
    cache: 'no-cache',
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.json();
  if(response.status === 401){
    return null;
  }
  return data;
}


export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req;
  const token = getToken(cookies);
  const searchParams = new URLSearchParams(nextUrl.search);
  const userInfo = await me(token);
  const isUserSigned = userInfo !== null;
  if (isAuthPages(nextUrl)) {
    if (!isUserSigned) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/dashboard?${searchParams}`, req.url)
    );
  }

  if(isAuthNeedPages(nextUrl) && !isUserSigned){
    return NextResponse.redirect(
      new URL(`/login?${searchParams}`, req.url)
    );
  }

  if(isDoctorPages(nextUrl) && userInfo.role !== 'DOCTOR'){
    return NextResponse.redirect(
      new URL(`/dashboard?${searchParams}`, req.url)
    );  
  }

  const requestHeaders = new Headers(req.headers);
  const userHeaders = {
    'x-user-id': userInfo?.id,
    'x-user-role': userInfo?.role,
    'x-user-name': userInfo?.name,
  }

  Object.entries(userHeaders).forEach(([key, value]) => {
    requestHeaders.set(key, value);
  });

  return NextResponse.next({
    headers: requestHeaders,
  });
  
}

export const config = {
  matcher: ['/','/dashboard/:path*', '/login', '/register', '/forgot-password'],
};
