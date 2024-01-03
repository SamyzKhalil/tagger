export default defineNuxtRouteMiddleware(async () => {
  const image = await dbGetUniqueImage()

  if (image) {
    return navigateTo(`/label/${image.id}/${image.file_name}`, {
      replace: true,
    })
  }
})
