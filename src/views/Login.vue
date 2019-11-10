<template>
    <div>
      <cube-form
        :model="model"
        :schema="schema"
        @validate="validateHandler"
        @submit="submitHandler"></cube-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      model: {
        username: '',
        passworrd: '',
      },
      schema: {
        groups: [
          {
            legend: '登陆页面',
            fields: [
              {
                type: 'input',
                modelKey: 'username',
                label: '用户名',
                props: {
                  placeholder: '请输入用户名',
                },
                rules: {
                  required: true,
                },
                // validating when blur
                trigger: 'blur',
              },
              {
                type: 'input',
                modelKey: 'password',
                label: '密码',
                props: {
                  placeholder: '请输入密码',
                },
                rules: {
                  required: true,
                },
                eye: {
                  open: true,
                },
                // validating when blur
                trigger: 'blur',
              },
            ],
          },
          {
            fields: [
              {
                type: 'submit',
                label: 'Submit',
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      // 登陆请求
      this.$store.dispatch('login', this.model)
        .then((code) => {
          if (code) {
            // 登陆成功, 重定向
            const path = this.$route.query.redirect || '/';
            this.$router.push(path);
            console.log(this.$route);
            console.log(this.$router);
          }
        })
        .catch((error) => {
          // 登陆失败或有错误发生
          const toast = this.$createToast({
            time: 200,
            txt: error.message || error.respone.data.message || '登陆失败',
            type: 'error',
          });
          toast.show();
        });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex);
    },
  },
};
</script>

<style scoped>

</style>
