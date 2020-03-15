<template>
	<div>
		<div v-if="loading">Loading....</div>
		<div v-else>
			<slot name="prefix"></slot>
			{{ user && user.name }}
			<slot name="suffix"></slot>
		</div>
	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				user: null,
				loading: true,
				errored: false
			}
		},
		
		mounted () {
			// this.axios
			// .get(baseUrl + '/user/1')
			// getUser(1)
			this.$service.user.getUser(1)
			.then(response => {
				console.log(response.data)
				this.user = response.data.data
			})
			.catch((error)=>{
        console.log(error)
        this.errored = true
      })
			.finally(() => this.loading = false)
			
		},
		
		filters: {
			
		}
	}
</script>

<style>
</style>
