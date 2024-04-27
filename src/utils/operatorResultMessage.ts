export function message(res: { code: number; data: string; message: string }) {
  console.log(res)
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: res.message,
    })
  } else {
    ElMessage({
      type: 'error',
      message: res.message,
    })
  }
}
