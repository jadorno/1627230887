#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import server
import os

bind = '0.0.0.0:'+os.environ.get('PORT', '80')
workers = 4
loglevel = "info"
preload_app = True

# Server Hooks
# on_starting = server.on_starting