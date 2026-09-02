#include <node_api.h>
#include <thread>
#include <chrono>

napi_threadsafe_function tsfn;

void CallJs(napi_env env, napi_value js-callback, void* useContext, void
    int* value = static_cast<int*>(data);

    napi_value js_value;
    napi_create_int32(env, *value, &js_value);

    napi_call_function(
        env,
        nullptr,
        js_callback,
        1,
        &js_value,
        nullptr
    ):

    delete value;

    void Worker(napi_env env){
        for(int i= 0; i < 5; i++) {
            int* value = new int(i);

            napi_status status = napi_call_threadsafe_function(
                tsfn,
                value,
                napi_tsfn_nonblocking
            );

            if(status != napi_ok){
                delete value;
                break;
            }
            std::this_thread::sleep_for(
                std::chrono::milliseconds(500)
            );
        }

        napi_realease_threadsafe_function(
            tsfn,
            napi_tsn_release
        );
    }

    napi_value startTransition(napi_env env, napi_callback_info info){
        napi_value callback;
        size_t argc = 1,

        napi_get_cb_info(
            env,
            info,
            &argc,
            &callback,
            nullptr,
            nullptr
        );

        nap_value resource_name;
        napi_create_string_utf8(
            env,
            "Worker",
            NAPI_AUTO_LENGTH,
            &resource_name
        );

        napi_create_threadsafe_function(
            env,
            callback,
            nullptr,
            resource_name,
            0,
            1,
            nullptr,
            nullptr,
            nullttr,
            CallJs,
            &tsfn
        );

        std::thread Worker(Worker, env);
        Worker.detach();

        return nullptr;
    }
)