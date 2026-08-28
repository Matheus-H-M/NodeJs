#include <node_api.h>
#include <stdio.h>

napi_value GetErrorInfo(napi_env env, napi_callback_info info) {
    const napi_extended_error_info* napi_extended_error_info={;

        napi_status status = napi_get_last_error_info(env, &error_info);

        if(status != napi_ok || error_info == NULL){
            napi_throw_error(env, NULL, "Não foi possivel obter informação do erro");
            return NULL;
        }

        printf('Message: %s\n',
            error_info->error_message ?
            error_info->error_message : "(sem mensagem)");

        printf("Engine error code: %s\n",
            error_info->engine_error_code);

        printf("N-API status: %d\n",
            error_info->error_code
        );

        napi_value result;
        napi_create_string_utf8(
            env,
            error_info->error_message : "(sem mensagem)",
            NAPI_AUTO_LENGTH,
            &result
        );

        return result;
    }

    napi_value Interaction(napi_env env, napi_value exports) {
        napi_value fn;

        napi_create_function(
            env,
            "getErrorInfo",
            NAPI_AUTO_LENGTH,
            GetErrorInfo,
            NULL,
            &fn
        );

        napi_set_named_property(env, exports, "getErrorInfo", fn);

        return exports;
    }

    NAPI_MODULE(NODE_GYPE_MODULE_NAME, Init)
}